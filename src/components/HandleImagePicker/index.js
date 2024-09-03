import React from 'react';
import ImagePickerModal from '../ImagePickerModal';
import {PickImageFromGallery, TakeCameraPicture} from '../../utils/Gallery';

const HandleImagePicker = ({onImagePicked, onClose, modalVisible}) => {
  const handleTakePhoto = async () => {
    try {
      const image = await TakeCameraPicture();
      onImagePicked(image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const image = await PickImageFromGallery();
      onImagePicked(image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImagePickerModal
      isVisible={modalVisible}
      onClose={onClose}
      onTakePhoto={handleTakePhoto}
      onChooseFromGallery={handleChooseFromGallery}
    />
  );
};

export default HandleImagePicker;
