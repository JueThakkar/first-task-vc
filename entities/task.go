package entities

import (
	"github.com/jinzhu/gorm"
)

type Filedetail struct {
	gorm.Model
	FilePath string
}
