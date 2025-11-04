package kr.co.iefriends.pcsx2.settings.ui

enum class MenuTag {
    CONFIG("config"),
    CONFIG_GENERAL("config_general"),
    CONFIG_INTERFACE("config_interface"),
    CONTROLLER("controller"),
    GRAPHICS("graphics"),
    HACKS("hacks"),
    DEBUG("debug"),
    ENHANCEMENTS("enhancements");
    var tag: String
        private set
    var subType = -1
        private set

    constructor(tag: String) {
        this.tag = tag
    }

    constructor(tag: String, subtype: Int) {
        this.tag = tag
        this.subType = subtype
    }
    override fun toString(): String {
        if (subType != -1) {
            return "$tag|$subType"
        }

        return tag
    }

    companion object {
        fun getMenuTag(menuTagStr: String?): MenuTag? {
            if (menuTagStr.isNullOrEmpty()) {
                return null
            }
            var tag = menuTagStr
            var subtype = -1
            val sep = menuTagStr.indexOf('|')
            if (sep != -1) {
                tag = menuTagStr.substring(0, sep)
                subtype = menuTagStr.substring(sep + 1).toInt()
            }
            return getMenuTag(tag, subtype)
        }

        private fun getMenuTag(tag: String, subtype: Int): MenuTag {
            for (menuTag in entries) {
                if (menuTag.tag == tag && menuTag.subType == subtype) return menuTag
            }

            throw IllegalArgumentException(
                "You are asking for a menu that is not available or " +
                        "passing a wrong subtype"
            )
        }
    }
}
