'use client'
import React, { useState } from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UpdatePasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationSchema = yup.object().shape({
    newPassword: yup.string()
      .notOneOf([oldPassword], 'New password must be different from old password')
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().oneOf([newPassword], 'Passwords must match')
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema.validate({ newPassword, confirmPassword }, { abortEarly: false })
      .then(() => {
        
        console.log('Update password action');
        setErrors({});
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose(); 
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        setErrors(validationErrors);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Update Password Modal"
    >
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <div className="error">{errors.newPassword}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <button type="submit">Update Password</button>
      </form>
    </Modal>
  );
};

export default UpdatePasswordModal;
