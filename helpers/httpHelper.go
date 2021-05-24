package helpers

import (
	"encoding/json"
	"net/http"
)

func execSendResponse(w http.ResponseWriter, r map[string]interface{}, ct string) {
	w.Header().Set("Content-Type", ct)
	json.NewEncoder(w).Encode(r)
}

func sendResponse(w http.ResponseWriter, r map[string]interface{}) {
	execSendResponse(w, r, "application/json")
}

func SendSuccessResult(w http.ResponseWriter, data interface{}) {
	result := map[string]interface{}{"s": Success(), "d": data}
	sendResponse(w, result)
}

func SendSuccessResultWithMsg(w http.ResponseWriter, data interface{}, msg string) {
	result := map[string]interface{}{"s": Success(), "d": data, "m": msg}
	sendResponse(w, result)
}

func SendErrorResult(w http.ResponseWriter, msg string) {
	result := map[string]interface{}{"s": Error(msg)}
	sendResponse(w, result)
}

func SendPlainTextErrorResult(w http.ResponseWriter, msg, ct string) {
	result := map[string]interface{}{"s": Error(msg)}
	execSendResponse(w, result, ct)
}

func SendPlainTextSuccessResultWithMsg(w http.ResponseWriter, data interface{}, msg, ct string) {
	result := map[string]interface{}{"s": Success(), "d": data, "m": msg}
	execSendResponse(w, result, ct)
}

func SendRequiredFieldsMissing(w http.ResponseWriter) {
	result := map[string]interface{}{"s": Error("Required field(s) missing OR validation failed.")}
	sendResponse(w, result)
}

func GetRedirectUrlFromQs(req *http.Request) string {
	if len(req.URL.Query()["redirectUrl"]) > 0 {
		return req.URL.Query()["redirectUrl"][0]
	}

	return ""
}
