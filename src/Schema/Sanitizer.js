import { stripHtml } from "string-strip-html";

export default function sanitizeData(string) {
    return stripHtml(string.trim()).result;
  }

