import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './dialog.styles.scss';

interface DialogProps {
  title: string;
  description?: string;
  onClick?: () => void;
  isOpen: boolean;
}

const DialogDemo = (props: DialogProps) => {
  const { title, description, onClick, isOpen } = props;

  const buttonCloseClick = () => {
    onClick && onClick();
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <Dialog.Description className="dialog-description">
            {description}
          </Dialog.Description>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button onClick={buttonCloseClick} className="button-ok">OK</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default DialogDemo;