import React, { useRef, useState } from "react";
import { CKEditor } from "ckeditor4-react";
import parse from 'html-react-parser';

function App() {
  const dataref = useRef();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const getData = () => {
    // console.log(datas);
    // setData(parse(datas));
    if (dataref.current.style.display === "none") dataref.current.style.display = "block";
    else dataref.current.style.display = "none";
  }

  return (
    <div className="App">
      <CKEditor
        initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>"
        config={{ extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "iframe", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley"] }}
        onChange={(event, editor) => {
          // console.log(event);
          // console.log(event.editor.getData());
          setData(String(event.editor.getData()))
        }}
        type="classic"
        onBeforeLoad={CKEDITOR => {
          // Handles `beforeLoad` event which is fired before an editor instance is created.
          // CKEDITOR.disableAutoInline = true
        }}
        onInstanceReady={({ editor }) => {
          // Handles native `instanceReady` event.
          // console.log(editor);
        }}
      />
      <button type="button" onClick={getData}>Get Data</button>
      <div ref={dataref} style={{ display: "none" }}>
        {parse(data)}
      </div>

      <button type="button" onClick={() => setOpen(true)}>Open nw CKEditor</button>

      {open && (
        <CKEditor
          initData={data}
          config={{ extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "iframe", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley"] }}
          onChange={(event, editor) => {
            // console.log(event);
            // console.log(event.editor.getData());
            setData(parse(String(event.editor.getData())))
          }}
          type="classic"
          onBeforeLoad={CKEDITOR => {
            // Handles `beforeLoad` event which is fired before an editor instance is created.
            // CKEDITOR.disableAutoInline = true
          }}
          onInstanceReady={({ editor }) => {
            // Handles native `instanceReady` event.
            // console.log(editor);
          }}
        />
      )}
    </div>
  );
}

export default App;
