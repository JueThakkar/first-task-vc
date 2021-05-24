package helpers

var SuccessCode = 0
var ErrorCode = 1
var ExceptionCode = -1
var ErrorCode1 = 2

func Success() map[string]interface{} {
	return map[string]interface{}{"c": SuccessCode}
}

func Message(c int, msg string) map[string]interface{} {
	return map[string]interface{}{"c": c, "m": msg}
}

func Error(msg string) map[string]interface{} {
	return map[string]interface{}{"c": ErrorCode, "m": msg}
}

func Exception() map[string]interface{} {
	return map[string]interface{}{"c": ExceptionCode}
}

func Error1(msg string) map[string]interface{} {
	return map[string]interface{}{"c": ErrorCode1, "m": msg}
}
