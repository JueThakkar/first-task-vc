package config

import (
	"encoding/json"
	"log"
	"os"
)

var Settings struct {
	// website
	HostAddress string `json:"hostAddress"`

	// db
	DbProvider         string `json:"dbProvider"`
	DbConnectionString string `json:"dbConnectionString"`
}

func InitConfig(configPath string) {
	configFile, err := os.Open(configPath)
	if err != nil {
		log.Panicf(err.Error(), "config.go - init - os.Open - open config", map[string]interface{}{"configPath": configPath})

		return
	}

	jsonParser := json.NewDecoder(configFile)
	if err = jsonParser.Decode(&Settings); err != nil {
		log.Panicf(err.Error(), "config.go - init - jsonParser.Decode - parse config", map[string]interface{}{"configPath": configPath})
	}
}
