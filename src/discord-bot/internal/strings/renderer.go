package strings

import (
	"bytes"
	"text/template"
)

// Render a template to string
func Render(tmpl *template.Template, data interface{}) string {
	buffer := &bytes.Buffer{}
	tmpl.Execute(buffer, data)
	return buffer.String()
}
