import React, { createRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import "assets/styles/rich-text.css";
import "assets/styles/rich-text.scss";
import "draft-js/dist/Draft.css";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  CodeOutlined,
} from "@mui/icons-material";
import draftToHtml from "draftjs-to-html";

class RichText extends React.Component {
  constructor(props) {
    super(props);
    let blockFromHtml = convertFromHTML(props.value);
    let content = ContentState.createFromBlockArray(
      blockFromHtml.contentBlocks,
      blockFromHtml.entityMap
    );
    this.state = {
      editorState: !!props.value
        ? EditorState.createWithContent(content)
        : EditorState.createEmpty(),
    };
    this.editorRef = createRef();

    this.focus = () => this.editorRef.current.focus();
    this.onChange = (editorState) =>
      this.setState({ editorState }, () => {
        let rawContent = convertToRaw(
          this.state.editorState.getCurrentContent()
        );
        let htmlContent = draftToHtml(rawContent);
        let plainText = this.state.editorState
          .getCurrentContent()
          .getPlainText();
        props.onChange({
          html: htmlContent,
          raw: rawContent,
          plain: plainText,
        });
      });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div
        className={[
          "RichEditor-root",
          this.props.bordered ? "bordered" : null,
          this.props.error ? "error" : null,
        ]
          .concat(this.props.className?.split(" "))
          .join(" ")}
      >
        <div className="RichEditor-container">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            label={this.props.label}
            name={this.props.name}
            onChange={this.onChange}
            onBlur={this.props.onBlur}
            placeholder={this.props.placeholder ?? "..."}
            ref={this.editorRef}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPE_TEXTS = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
];

const BLOCK_TYPES = [
  { label: <FormatQuote />, style: "blockquote" },
  { label: <FormatListBulleted />, style: "unordered-list-item" },
  { label: <FormatListNumbered />, style: "ordered-list-item" },
  { label: <CodeOutlined />, style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPE_TEXTS.map((type) => (
        <StyleButton
          key={`text-${type.style}`}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={`block-${type.style}`}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: <FormatBold />, style: "BOLD" },
  { label: <FormatItalic />, style: "ITALIC" },
  { label: <FormatUnderlined />, style: "UNDERLINE" },
  { label: <Code />, style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

RichText.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
};

export default RichText;
