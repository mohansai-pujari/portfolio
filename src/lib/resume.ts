import { resumeConfig } from "@/data/portfolio";
import { asNonEmptyString } from "@/lib/safe-data";

export const RESUME_DOWNLOAD_PATH = "/api/resume";

export function getResumeFileName(): string {
  return asNonEmptyString(resumeConfig.fileName, "Mohan Sai Pujari_CV.pdf");
}

/** Path to the PDF in `public/` (local fallback). */
export function getLocalResumePath(): string {
  return `/${getResumeFileName()}`;
}

export function getRemoteResumeUrl(): string {
  return asNonEmptyString(resumeConfig.remoteUrl);
}
