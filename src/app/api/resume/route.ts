import { NextRequest, NextResponse } from "next/server";
import { getLocalResumePath, getRemoteResumeUrl } from "@/lib/resume";

async function isUrlReachable(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { Range: "bytes=0-0" },
      });
    }

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: NextRequest) {
  const remoteUrl = getRemoteResumeUrl();
  const localPath = getLocalResumePath();
  const localUrl = new URL(localPath, request.url);

  if (remoteUrl) {
    const remoteAvailable = await isUrlReachable(remoteUrl);
    if (remoteAvailable) {
      return NextResponse.redirect(remoteUrl, 302);
    }
  }

  const localAvailable = await isUrlReachable(localUrl.toString());
  if (localAvailable) {
    return NextResponse.redirect(localUrl, 302);
  }

  return NextResponse.json(
    {
      error:
        "Resume not found. Add the PDF to public/Mohan Sai Pujari_CV.pdf or set resumeConfig.remoteUrl.",
    },
    { status: 404 },
  );
}
