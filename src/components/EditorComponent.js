import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CustomToolbar = () => (
  <div id="toolbar">
    <button type="button" className="ql-save">
      SAVE
    </button>
    <button type="button" className="ql-variable">
      Variables
    </button>
  </div>
)

const EditorComponent = () => (
  <div>
    <CustomToolbar />
    <ReactQuill modules={{toolbar: '#toolbar'}} />
  </div>
)

export default EditorComponent
