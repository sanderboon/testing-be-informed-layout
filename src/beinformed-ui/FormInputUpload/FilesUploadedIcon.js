// @flow
import { Icon } from "_component-registry/icon";

const MAX_PROGRESS = 100;

export type Props = {
  +className?: string,
  +file: Object,
};

const FilesUploadedIcon = ({ className, file }: Props) => {
  if (file.error) {
    return <Icon className={className} name="alert-circle-outline" />;
  }

  if (file.progress === MAX_PROGRESS || !file.progress) {
    return <Icon className={className} name="delete" />;
  }

  if (file.progress > 0 && file.progress < MAX_PROGRESS) {
    return <Icon className={className} name="close" />;
  }

  return null;
};
FilesUploadedIcon.displayName = "BI.FilesUploadedIcon";

export default FilesUploadedIcon;
