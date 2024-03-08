import React from 'react';
import styled from 'styled-components';
import { useForm, Modal, FormItem, Textarea, Form } from '@kubed/components';
import type { ModalProps } from '@kubed/components';
import { merge } from 'lodash';

const StyledForm = styled(Form)`
  padding: 20px;
`;

const StyledTextarea = styled(Textarea)`
  &&& {
    max-width: none;
  }

  textarea {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    line-height: 1.4;
  }
`;

interface EnterLicenseModalProps extends Pick<ModalProps, 'visible' | 'title'> {
  onCancel: () => void;
  isReloadOnSuccess?: boolean;
  onSuccess?: () => void;
}

function CreateLogModal({ visible, onSuccess, onCancel, ...rest }: EnterLicenseModalProps) {
  const [form] = useForm<any>();
  const handleOk = () => {};

  const defaultProps = {
    title: t('Create New Log'),
  };

  const finalProps = merge({}, defaultProps, rest);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      // for embed
      visible={visible}
      onCancel={onCancel}
      wrapClassName="enter-license-modal-wrap"
      // confirmLoading={isLoading}
      onOk={handleOk}
      {...finalProps}
    >
      <StyledForm form={form}>
        <FormItem
          name="raw"
          label={t('Descriptions')}
          rules={[{ required: true, message: t('ENTER_ACTIVATION_CODE_TIP') }]}
        >
          <StyledTextarea />
        </FormItem>
      </StyledForm>
    </Modal>
  );
}

export default CreateLogModal;
