// @flow
import xhr from "beinformed/utils/fetch/xhr";
import { HTTP_METHODS, UPLOAD_PATH } from "beinformed/constants/Constants";

import type {
  FiletypeConstraintsType,
  FilesizeConstraintsType,
} from "beinformed/models/attributes/UploadAttributeModel";

const getAcceptedFiles = (fileTypes: FiletypeConstraintsType) => {
  const accept = [];

  fileTypes.forEach((fileType) => {
    if (fileType.extensions) {
      accept.push(...fileType.extensions.map((extension) => `.${extension}`));
    }

    if (fileType.mimeTypes) {
      accept.push(...fileType.mimeTypes);
    }
  });

  return accept;
};

const getExceededMaximum = (
  maxFileSize: FilesizeConstraintsType,
  uploadedFiles: FileList
) => {
  if (maxFileSize.isMaxTotal) {
    const totalUploadSize = Array.from(uploadedFiles).reduce(
      (accumulatedFileSize, file) => accumulatedFileSize + file.size,
      0
    );

    if (maxFileSize.fileSize && maxFileSize.fileSize < totalUploadSize) {
      return totalUploadSize;
    }
  }

  return -1;
};

const getFileExtension = (file: File) =>
  file.name.split(".").pop().toLowerCase();

const isNotAllowedFileType = (
  fileTypes: FiletypeConstraintsType = [],
  file: File
) => {
  if (fileTypes.length > 0) {
    const fileExtension = getFileExtension(file);

    return !fileTypes.some((fileType) =>
      fileType.extensions.includes(fileExtension)
    );
  }

  return false;
};

const uploadFile = (
  file: File,
  progressHandler: (file: File, uploadInfo: Object) => void
) =>
  xhr({
    url: UPLOAD_PATH,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": file.type,
      "x-filename": encodeURIComponent(file.name),
      "x-filesize": file.size.toString(),
    },
    onProgress: (e: ProgressEvent) => {
      if (e.lengthComputable) {
        progressHandler(file, {
          progress: Math.ceil((e.loaded / e.total) * 100),
        });
      }
    },
    data: file,
  });

export {
  getAcceptedFiles,
  getExceededMaximum,
  getFileExtension,
  isNotAllowedFileType,
  uploadFile,
};
