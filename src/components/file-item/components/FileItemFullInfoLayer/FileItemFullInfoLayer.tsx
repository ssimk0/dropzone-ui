import React, { FC } from "react";
import { Localization } from "../../../../localization/localization";
import { Cancel } from "../../../icons";

import FileItemStatus from "../FileItemStatus/FileItemStatus";

const FileItemFullInfoLayer: FC<FileItemFullInfoLayerProps> = (
  props: FileItemFullInfoLayerProps,
) => {
  const {
    showInfo,
    valid,
    onClose,
    fileName,
    fileSize,
    fileType,
    uploadStatus,
    uploadMessage,
    localization,
  } = props;
  const handleCloseInfo = () => {
    onClose?.();
  };
  return (
    <div className={showInfo ? "full-info" : "full-info hide"}>
      <span
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Cancel
          style={{ margin: 0, right: 0, top: 0 }}
          color="rgba(255,255,255,0.8)"
          onClick={handleCloseInfo}
          colorFill="black"
        />
        {uploadStatus && uploadStatus !== "uploading" ? (
          <div className={"file-status"}>
            <FileItemStatus
              uploadStatus={uploadStatus}
              localization={localization}
            />
          </div>
        ) : (
          <div className="file-status">
            <FileItemStatus valid={valid} localization={localization} />
          </div>
        )}
      </span>
      {uploadMessage && <div className="name">{uploadMessage}</div>}
      <div className="name">
        <span className="sub-label">
          {localization === "ES-es" ? "Nombre: " : "Name: "}
        </span>
        {fileName}
      </div>

      <div className="size">
        <span className="sub-label">
          {localization === "ES-es" ? "Tamaño: " : "Size: "}
        </span>{" "}
        {fileSize}
      </div>
      <div className="mime">
        <span className="sub-label">
          {localization === "ES-es" ? "Tipo: " : "Type: "}
        </span>{" "}
        {fileType}
      </div>
    </div>
  );
};
export default FileItemFullInfoLayer;

export interface FileItemFullInfoLayerProps {
  showInfo: boolean;
  fileName: string;
  fileSize: string;
  fileType: string;
  valid: boolean;
  onClose: Function;
  uploadMessage?: string;
  uploadStatus?: undefined | "uploading" | "success" | "error";
  /**
   * language to be used
   * for now
   * only English and Spanish is supported
   */
  localization: Localization;
}
