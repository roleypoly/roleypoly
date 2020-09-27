package common

// FindString returns true if needle is in haystack
func FindString(needle string, haystack []string) bool {
	for _, str := range haystack {
		if str == needle {
			return true
		}
	}

	return false
}
