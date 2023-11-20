import React, { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor, EditorProps } from "react-draft-wysiwyg";

export const ControlledEditor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(ContentState.createFromText(""))
  );

  const onEditorStateChange: EditorProps["onEditorStateChange"] = (
    editorState
  ) => {
    setEditorState(editorState);
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
    />
  );
};
