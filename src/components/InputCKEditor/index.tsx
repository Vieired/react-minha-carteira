import React from 'react';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { Container } from './styles';

interface Prop {
  name: string;
  label?: string;
  onChange: (value: string) => void;
  //   onBlur: (event, editor) => void;
  value: string;
  disabled?: boolean;
  hideToolbar?: boolean;
}

export const InputCKEditor: React.FC<Prop> = ({
  label,
  name,
  onChange,
  //   onBlur,
  value,
  disabled,
  hideToolbar = false,
}) => {

  const config = {
    // plugins: [
    //   //   Paragraph,
    //   // Base64UploadAdapter,
    //   Essentials,
    //   // Bold,
    //   // Italic,
    //   // Alignment,
    // ],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        // 'paragraph',
        // 'alignment',
      ],
    },
  };

  return (
    <Container className={`${hideToolbar ? 'ck-display-mode' : ''}`}>
      {label && (
        <label htmlFor={name}>{label}</label>
      )}
      <CKEditor
        editor={Editor}
        config={config}
        data={value}
        onChange={(event:any, editor:any) => onChange(editor?.getData())}
        id={name}
        disabled={disabled}
      />
    </Container>
  );
};

export default InputCKEditor;
