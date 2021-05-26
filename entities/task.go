package entities

import (
	"github.com/jinzhu/gorm"
)

type Filedetail struct {
	gorm.Model
	FilePath string
}

type Userdetail struct {
	gorm.Model
	FirstName  string
	MiddleName string
	LastName   string
	Gender     string
	Category   string
	Mobile     string
}
