// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'cuix/dist/components/Modal';
import { Input, InputRef } from 'antd';

import { i18nReact } from '../../utils/i18nReact';

import './InputModal.scss';

interface InputModalProps {
  cancelText?: string;
  initialValue?: string | number;
  inputLabel: string;
  inputType?: 'text' | 'number';
  onClose: () => void;
  onSubmit: (value: string | number) => void;
  submitText?: string;
  showModal: boolean;
  title: string;
  buttonDisabled?: boolean;
}

const InputModal = ({
  inputLabel,
  inputType = 'text',
  initialValue = '',
  onClose,
  onSubmit,
  showModal,
  title,
  buttonDisabled,
  ...i18n
}: InputModalProps): JSX.Element => {
  const inputRef = useRef<InputRef>(null);

  const [value, setValue] = useState<string | number>(initialValue);
  const { t } = i18nReact.useTranslation();
  const { cancelText = t('Cancel'), submitText = t('Submit') } = i18n;

  const handleSubmit = () => {
    onSubmit(value);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef.current]);

  return (
    <Modal
      cancelText={cancelText}
      className="hue-input-modal cuix antd"
      okText={submitText}
      onCancel={onClose}
      onOk={handleSubmit}
      open={showModal}
      title={title}
      secondaryButtonProps={{ disabled: buttonDisabled }}
      okButtonProps={{ disabled: buttonDisabled || initialValue === value }}
      cancelButtonProps={{ disabled: buttonDisabled }}
    >
      <div className="hue-input-modal__input-label">{inputLabel}</div>
      <Input
        className="hue-input-modal__input"
        defaultValue={value}
        type={inputType}
        disabled={buttonDisabled}
        onPressEnter={handleSubmit}
        ref={inputRef}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
    </Modal>
  );
};

export default InputModal;
