import React, { FC, useEffect, useState } from "react";
//import { FileItemProps } from "../FileItem/FileItemProps";
import FileItemStatus from "../FileItemStatus/FileItemStatus";
import {
  Cancel,
  Visibility,
  Info,
} from "../../../icons";
import { Localization } from "../../../../localization/localization";
//import {shrinkWord} from "./../../utils";
export interface FileItemMainLayerProps {
  showInfo: boolean;
  onOpenInfo: Function;
  onOpenImage: Function | undefined;
  onDelete: Function;
  //fileNamePosition: FileItemProps["fileName"];
  fileName: string;
  info: boolean;
  valid: boolean;
  isImage: boolean;
  uploadStatus?: undefined | "uploading" | "success" | "error";
  sizeFormatted: string;
  /**
   * language to be used
   * for now
   * only English and Spanish is supported
   */
  localization: Localization;
}

const FileItemMainLayer: FC<FileItemMainLayerProps> = (
  props: FileItemMainLayerProps,
) => {
  const {
    showInfo,
    onDelete,
    info,
    //fileName,
    //fileNamePosition,
    valid,
    isImage,
    onOpenInfo,
    onOpenImage,
    sizeFormatted,
    uploadStatus,
    localization
  } = props;
  const handleDelete = () => {
    onDelete?.();
  };
  const handleOpenInfo = () => {
    onOpenInfo?.();
  };
  const handleOpenImage = () => {
    onOpenImage?.();
  };
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  useEffect(() => {
    if (uploadStatus === "success") {
      setTimeout(() => {
        setUploadComplete(true);
      }, 2000);
    }
  }, [uploadStatus]);
  return (
    <div className="info-container">
      <div className={showInfo ? "status-close hide" : "status-close"}>
        <Cancel
          color="rgba(255,255,255,0.8)"
          onClick={handleDelete}
          colorFill="black"
        />
      </div>
      {/*  {fileNamePosition === "inside" && (
        <div className="file-item-name">{shrinkWord(fileName)}</div>
      )} */}

      {uploadStatus && !showInfo &&(
        <div className={(uploadComplete) ? "file-status hide" : "file-status"}>
          <FileItemStatus uploadStatus={uploadStatus} localization={localization}/>
        </div>
      )}
   
      <div className={"file-item-footer"}>
        {uploadStatus && uploadComplete ? (
          <div className={showInfo ? "file-status hide" : "file-status"}>
            <div className="file-status-ok">
              <FileItemStatus uploadStatus={uploadStatus} message={localization==="ES-es"?"subido":"uploaded"} localization={localization}/>
            </div>
          </div>
        ) : (
          <div className={showInfo ? "file-status hide" : "file-status"}>
            <FileItemStatus valid={valid}  localization={localization}/>
          </div>
        )}

        <div className={showInfo ? "size-open-info hide" : "size-open-info"}>
          <div className={"file-item-size"}>{sizeFormatted}</div>
          {isImage && onOpenImage && valid && (
            <Visibility
              className="view-in-image-file-item"
              color="white"
              onClick={handleOpenImage}
              size="small"
            />
          )}
          {info && (
            <Info
              color="rgba(255,255,255,0.8)"
              onClick={handleOpenInfo}
              colorFill="black"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default FileItemMainLayer;
