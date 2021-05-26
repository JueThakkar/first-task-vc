package logger

import (
	"io"
	"log"
)

func SetOutput(w io.Writer) {
	log.SetOutput(w)
}

func Debug(message string, location string, data interface{}) {
	log.Printf("DEBUG - msg: %s; loc: %s; data: %#v", message, location, data)
}

func Info(message string, location string, data interface{}) {
	log.Printf("INFO - msg: %s; loc: %s; data: %#v", message, location, data)
}

func Warning(message string, location string, data interface{}) {
	log.Printf("WARNING - msg: %s; loc: %s; data: %#v", message, location, data)
}

func Error(err error, location string, data interface{}) {
	log.Printf("ERROR - msg: %s; loc: %s; data: %#v", err.Error(), location, data)
}

func Critical(message string, location string, data interface{}) {
	log.Panicf("CRITICAL - msg: %s; loc: %s; data: %#v", message, location, data)
}
