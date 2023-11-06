import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

const RoomEditor = ({ handleOnChange, value }) => {
  const monacoEditorRef = useRef(null);
  const handleEditorMount = (editor) => {
    editor.focus();
    monacoEditorRef.current = editor;
  };
  const listenForChangeOnCode = (data) => {
    // Get caret position
    // ! NEED STUDY
    // let selection = monacoEditorRef.current.getModel().getOffsetAt(monacoEditorRef.current.getPosition())
    handleOnChange(data);
  };
  return (
    <div style={{ width: "80%", height: "100%" }}>
      <Editor
        value={value}
        onChange={listenForChangeOnCode}
        options={{
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: true,
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: true,
          fixedOverflowWidgets: false,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: true,
          formatOnPaste: true,
          formatOnType: true,
          hideCursorInOverviewRuler: false,
          highlightActiveIndentGuide: true,
          links: true,
          mouseWheelZoom: false,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestions: true,
          quickSuggestionsDelay: 100,
          readOnly: false,
          renderControlCharacters: false,
          renderFinalNewline: true,
          renderIndentGuides: true,
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: true,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: true,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapBreakObtrusiveCharacters: ".",
          wordWrapColumn: 80,
          wordWrapMinified: true,
          wrappingIndent: "same",
        }}
        className="roomEditor"
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme="vs-dark"
        onMount={handleEditorMount}
      />
    </div>
  );
};
export default RoomEditor;
