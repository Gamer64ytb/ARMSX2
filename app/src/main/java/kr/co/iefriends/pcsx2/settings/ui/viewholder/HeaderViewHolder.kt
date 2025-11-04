package kr.co.iefriends.pcsx2.settings.ui.viewholder

import android.view.View
import android.widget.TextView
import kr.co.iefriends.pcsx2.R
import kr.co.iefriends.pcsx2.settings.ui.SettingsAdapter
import org.dolphinemu.dolphinemu.features.settings.model.view.SettingsItem

class HeaderViewHolder(itemView: View, adapter: SettingsAdapter) :
    SettingViewHolder(itemView, adapter) {
    private var headerName: TextView? = null

    init {
        itemView.setOnClickListener(null)
    }

    override fun findViews(root: View) {
        headerName = root.findViewById(R.id.text_header_name)
    }

    override fun bind(item: SettingsItem) {
        headerName!!.setText(item.nameId)
    }

    override fun onClick(clicked: View) {
        // no-op
    }
}
