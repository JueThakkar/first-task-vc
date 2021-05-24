package main

import (
	"JueThakkar-Assignment/config"
	"JueThakkar-Assignment/entities"
	"JueThakkar-Assignment/logger"
	"io"
	"los-retail/helpers"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"bytes"
	"encoding/json"
	"flag"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/dipbhi/gorm"
	_ "github.com/dipbhi/gorm/dialects/mssql"
	_ "github.com/dipbhi/gorm/dialects/mssqlold"
	_ "github.com/dipbhi/gorm/dialects/mysql"
	"github.com/gorilla/context"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/schema"
)

var templates = template.New("Assignment")
var db *gorm.DB
var formDecoder = schema.NewDecoder()

const (
	PROCESSED_DIR_NAME = "processed"
)

func init() {
	// read templates
	templates = appendTemplatesDir(templates)

}

func setup() {
	flag.Parse()

	// config
	config.InitConfig("./config.json")

	// db
	var err error
	connStr := config.Settings.DbConnectionString
	db, err = gorm.Open(config.Settings.DbProvider, connStr)
	if err != nil {
		logger.Critical(err.Error(), "app.go - init() - gorm.Open", map[string]interface{}{"connStr": connStr})
		return
	}

	// max idle connections
	db.DB().SetMaxIdleConns(100)

}

func main() {
	//setup dependencies
	setup()

	r := mux.NewRouter()

	// Handler for static files
	staticPath := "./static"
	r.PathPrefix("/static/").Handler(cachedHandler(http.StripPrefix("/static/", http.FileServer(http.Dir(staticPath)))))

	// handlers for html requests
	// open access

	r.HandleFunc("/", FileUpload)
	r.HandleFunc("/file-upload", FileUpload)
	r.HandleFunc("/add-form-data", AddFormData)
	r.HandleFunc("/file-data", FileData)
	r.PathPrefix("/get-file/").HandlerFunc(GetFile)
	r.HandleFunc("/delete-file", DeleteFile)
	// r.HandleFunc("/course-master-data", CourseMasterData)
	// r.HandleFunc("/add-course", AddCourse)

	h := handlers.CompressHandler(r)

	// start the server
	logger.Info("Listening on :"+config.Settings.HostAddress, "app.go - main", nil)

	// listen on http
	log.Panic(http.ListenAndServe(config.Settings.HostAddress, context.ClearHandler(h)))
}

//...................... USER Screen Section - END..............................//

func appendTemplatesDir(t *template.Template) *template.Template {
	path := "./templates/*"
	return template.Must(template.ParseGlob(path))
}

func renderTemplate(w http.ResponseWriter, r *http.Request, tmpl string, data map[string]interface{}) {

	data["IESupport"] = template.HTML(`<!--[if lt IE 9]>
	    <script src="/static/js/html5shiv.min.js"></script>
	    <script src="/static/js/respond.min.js"></script>
	  <![endif]-->`)

	data["ShowSecondLevelApprovalLink"] = true

	if err := templates.ExecuteTemplate(w, tmpl, data); err != nil {
		logger.Error(err, "app.go - renderTemplate - template.ExecuteTemplate", map[string]interface{}{"tmpl": tmpl, "data": data})
		http.Error(w, "There was an error processing your request, please try again later.", http.StatusInternalServerError)
	}
}

func executeTemplateToString(tmpl string, data interface{}) string {
	var b bytes.Buffer

	if err := templates.ExecuteTemplate(&b, tmpl, data); err != nil {
		logger.Error(err, "app.go - executeTemplateToString - template.ExecuteTemplate", map[string]interface{}{"tmpl": tmpl, "data": data})
		return ""
	}

	return b.String()
}

func renderPartial(w http.ResponseWriter, tmpl string, data map[string]interface{}) {
	w.Header().Set("cache-control", "private, max-age=0, no-cache")
	w.Header().Set("pragma", "no-cache")
	w.Header().Set("expires", "-1")
	if err := templates.ExecuteTemplate(w, tmpl, data); err != nil {
		logger.Error(err, "app.go - renderPartial - template.ExecuteTemplate", map[string]interface{}{"tmpl": tmpl, "data": data})
	}
}

func cachedHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Cache-Control", "public,max-age=31536000")
		h.ServeHTTP(w, r)
	})
}

func sendJsonResponse(w http.ResponseWriter, r interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("cache-control", "private, max-age=0, no-cache")
	w.Header().Set("pragma", "no-cache")
	w.Header().Set("expires", "-1")

	json.NewEncoder(w).Encode(r)
}

func currentDateTime() time.Time {
	return time.Now().In(time.FixedZone("Asia/Kolkata", 19800))
}

func currentDateZeroTime() time.Time {
	current := currentDateTime()
	return time.Date(current.Year(), current.Month(), current.Day(), 0, 0, 0, 0, current.Location())
}

// Find the path string existent
func pathExists(path string) bool {
	_, err := os.Stat(path)
	if err == nil {
		return true
	}
	if os.IsNotExist(err) {
		return false
	}
	return true
}

func FileUpload(w http.ResponseWriter, r *http.Request) {

	vm := map[string]interface{}{
		"Title": "Course",
	}

	renderTemplate(w, r, "file-upload.html", vm)
}

// Add file path in db

func AddFormData(w http.ResponseWriter, r *http.Request) {

	reader, err := r.MultipartReader()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var idStr, file, fileName, fileExt, newFileName string

	for {
		part, err := reader.NextPart()

		if err == io.EOF {
			break
		}

		if part.FormName() == "null" {
			continue
		}
		if part.FormName() == "id" {
			bid := new(bytes.Buffer)
			bid.ReadFrom(part)
			idStr = bid.String()
		}
		if part.FormName() == "uploadFile" {
			bfile := new(bytes.Buffer)
			bfile.ReadFrom(part)
			file = bfile.String()

			// log.Println("File", file)

			// Get file extension of uploaded doc
			fileExt = filepath.Ext(part.FileName())
			fileName = part.FileName()
			log.Println("FileExtension : ", fileExt, "FileName:", fileName)
		}
	}

	fileDIr := "D:/"
	uploadFilePath := filepath.Join(fileDIr, "Assignment")

	// Check path exist or not
	if !pathExists(uploadFilePath) {
		os.MkdirAll(uploadFilePath, os.ModePerm) // Create new dir
	}

	fileStr := bytes.NewBufferString(file)

	if fileExt != "" {
		newFileName = strings.Replace(fileName, " ", "_", -1) // Replace white space and _ from file name

		//
		destPath := filepath.Join(uploadFilePath, newFileName)
		dst, err := os.Create(destPath)
		defer dst.Close()

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Copy uploaded file to destination
		_, err = io.Copy(dst, fileStr)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	id := 0
	if idStr != "" {
		id, _ = strconv.Atoi(idStr)
	}

	if id > 0 {
		// Update
	} else {
		e := entities.Filedetail{
			FilePath: newFileName,
		}

		db.Create(&e)
	}
	helpers.SendSuccessResult(w, nil)
}

func FileData(w http.ResponseWriter, r *http.Request) {
	query := db.Table("filedetails").
		Select("id, file_path").
		Where("deleted_at IS NULL")

	countQuery := &(*query)

	var list []*entities.Filedetail
	query.Scan(&list)

	// Total...
	var count int
	countQuery.Count(&count)

	// Result...
	result := struct {
		Total int                    `json:"total"`
		Rows  []*entities.Filedetail `json:"rows"`
	}{
		Total: count,
		Rows:  list,
	}
	sendJsonResponse(w, result)
}

func GetFile(w http.ResponseWriter, r *http.Request) {
	filePath := strings.TrimLeft(r.URL.Path, "/get-file/")
	fp := filepath.Join("D:/", filePath)

	log.Println(fp)
	http.ServeFile(w, r, fp)
}

func DeleteFile(w http.ResponseWriter, r *http.Request) {

	// read form data
	idStr := r.FormValue("id")

	id := 0
	if idStr != "" {
		id, _ = strconv.Atoi(idStr)
	}

	// delete from db
	if id > 0 {
		var e entities.Filedetail

		db.Where("id=? and deleted_at IS NULL", id).Find(&e)

		if e.ID > 0 {
			db.Delete(&e)
		}
	}

	helpers.SendSuccessResult(w, nil)
}

//....................... File Section - End .................................//
