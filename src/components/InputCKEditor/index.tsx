import React from 'react';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { Container } from './styles';

interface Prop {
  name: string;
  id?: string;
  label?: string;
  value: string;
  disabled?: boolean;
  hideToolbar?: boolean;
  onChange?(e: React.ChangeEvent<unknown>): void;
  // onBlur: () => void;
}

export const InputCKEditor: React.FC<Prop> = ({
  label,
  name,
  id,
  value,
  disabled,
  hideToolbar = false,
  onChange,
  // onBlur,
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

  const handleChange = (e: React.ChangeEvent<any>, editor: any) => {
    onChange && onChange({
        ...e,
        target: {
            ...e.target,
            value: editor?.getData() || '',
            id,
            name
        }
    } as React.ChangeEvent<any>)
  };

  return (
    <Container className={`${hideToolbar ? 'ck-display-mode' : ''}`}>
      { label && (
          <label id={`aria-label-${id || name}`} htmlFor={id || name}>
              {label}
          </label>
      )}
      <CKEditor
        editor={Editor}
        config={config}
        data={value}
        onChange={
          (evt: React.ChangeEvent<any>, editor: any) =>
            handleChange(evt, editor)
        }
        id={name}
        disabled={disabled}
      />
    </Container>
  );
};

export default InputCKEditor;
