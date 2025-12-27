import React, { useState, useRef, useEffect } from 'react'
import { Button, Dropdown, Input, Modal } from 'antd'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Undo,
  Redo
} from 'lucide-react'

const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const editorRef = useRef(null)
  const [htmlContent, setHtmlContent] = useState(value || '')
  const [linkModalVisible, setLinkModalVisible] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const prevValueRef = useRef(value)

  // Update editor when value prop changes (e.g., when form is populated)
  useEffect(() => {
    if (editorRef.current) {
      const currentContent = editorRef.current.innerHTML || ''
      const newValue = value || ''
      
      // Always sync with prop value if it's different from current content
      // This ensures form.setFieldsValue properly updates the editor
      if (prevValueRef.current !== value) {
        setHtmlContent(newValue)
        editorRef.current.innerHTML = newValue
        prevValueRef.current = value
      } else if (newValue !== currentContent && newValue !== '') {
        // Also update if content doesn't match and new value is not empty
        setHtmlContent(newValue)
        editorRef.current.innerHTML = newValue
      }
    }
  }, [value])
  
  // Initialize on mount if value exists
  useEffect(() => {
    if (editorRef.current && value && value !== htmlContent) {
      editorRef.current.innerHTML = value
      setHtmlContent(value)
      prevValueRef.current = value
    }
  }, [])

  const handleInput = (e) => {
    const content = e.target.innerHTML
    setHtmlContent(content)
    onChange?.(content)
  }

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    const content = editorRef.current?.innerHTML || ''
    setHtmlContent(content)
    onChange?.(content)
  }

  const insertHeading = (level) => {
    const headingTag = `h${level}`
    executeCommand('formatBlock', headingTag)
  }

  const handleInsertLink = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString()
    
    if (selectedText) {
      setLinkText(selectedText)
    }
    
    setLinkModalVisible(true)
  }

  const confirmLink = () => {
    if (linkUrl) {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)
      
      const link = document.createElement('a')
      link.href = linkUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.textContent = linkText || linkUrl
      
      range.deleteContents()
      range.insertNode(link)
      
      editorRef.current?.focus()
      const content = editorRef.current?.innerHTML || ''
      setHtmlContent(content)
      onChange?.(content)
    }
    
    setLinkModalVisible(false)
    setLinkUrl('')
    setLinkText('')
  }

  const headingMenuItems = [
    {
      key: 'h1',
      label: (
        <div className="flex items-center gap-2" onClick={() => insertHeading(1)}>
          <Heading1 className="h-4 w-4" />
          <span>Heading 1</span>
        </div>
      ),
    },
    {
      key: 'h2',
      label: (
        <div className="flex items-center gap-2" onClick={() => insertHeading(2)}>
          <Heading2 className="h-4 w-4" />
          <span>Heading 2</span>
        </div>
      ),
    },
    {
      key: 'h3',
      label: (
        <div className="flex items-center gap-2" onClick={() => insertHeading(3)}>
          <Heading3 className="h-4 w-4" />
          <span>Heading 3</span>
        </div>
      ),
    },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex gap-1 flex-wrap items-center">
        {/* Text Formatting */}
        <Button
          type="text"
          size="small"
          icon={<Bold className="h-4 w-4" />}
          onClick={() => executeCommand('bold')}
          title="Bold (Ctrl+B)"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<Italic className="h-4 w-4" />}
          onClick={() => executeCommand('italic')}
          title="Italic (Ctrl+I)"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<Underline className="h-4 w-4" />}
          onClick={() => executeCommand('underline')}
          title="Underline (Ctrl+U)"
          className="hover:bg-gray-200"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Headings */}
        <Dropdown
          menu={{ items: headingMenuItems }}
          trigger={['click']}
          placement="bottomLeft"
        >
          <Button
            type="text"
            size="small"
            icon={<Heading1 className="h-4 w-4" />}
            title="Headings"
            className="hover:bg-gray-200"
          />
        </Dropdown>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Lists */}
        <Button
          type="text"
          size="small"
          icon={<List className="h-4 w-4" />}
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<ListOrdered className="h-4 w-4" />}
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          className="hover:bg-gray-200"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Alignment */}
        <Button
          type="text"
          size="small"
          icon={<AlignLeft className="h-4 w-4" />}
          onClick={() => executeCommand('justifyLeft')}
          title="Align Left"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<AlignCenter className="h-4 w-4" />}
          onClick={() => executeCommand('justifyCenter')}
          title="Align Center"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<AlignRight className="h-4 w-4" />}
          onClick={() => executeCommand('justifyRight')}
          title="Align Right"
          className="hover:bg-gray-200"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Link */}
        <Button
          type="text"
          size="small"
          icon={<Link className="h-4 w-4" />}
          onClick={handleInsertLink}
          title="Insert Link"
          className="hover:bg-gray-200"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Undo/Redo */}
        <Button
          type="text"
          size="small"
          icon={<Undo className="h-4 w-4" />}
          onClick={() => executeCommand('undo')}
          title="Undo (Ctrl+Z)"
          className="hover:bg-gray-200"
        />
        <Button
          type="text"
          size="small"
          icon={<Redo className="h-4 w-4" />}
          onClick={() => executeCommand('redo')}
          title="Redo (Ctrl+Y)"
          className="hover:bg-gray-200"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 focus:outline-none text-sm leading-relaxed"
        style={{
          maxHeight: '400px',
          overflowY: 'auto'
        }}
        data-placeholder={placeholder}
      />

      {/* Link Insert Modal */}
      <Modal
        title="Insert Link"
        open={linkModalVisible}
        onOk={confirmLink}
        onCancel={() => {
          setLinkModalVisible(false)
          setLinkUrl('')
          setLinkText('')
        }}
        okText="Insert"
        cancelText="Cancel"
      >
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">Link URL</label>
            <Input
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onPressEnter={confirmLink}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Link Text (optional)</label>
            <Input
              placeholder="Link text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onPressEnter={confirmLink}
            />
          </div>
        </div>
      </Modal>

      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #999;
          pointer-events: none;
        }
        [contenteditable]:focus {
          outline: 2px solid #3b82f6;
          outline-offset: -2px;
        }
        [contenteditable] h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        [contenteditable] a:hover {
          color: #2563eb;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor

