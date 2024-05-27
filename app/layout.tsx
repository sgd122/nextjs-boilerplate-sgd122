import '@/styles/global.scss';

import clsx from 'clsx';

import { notoSansKr, notoSerifFont, pretendardFont } from '@/app/fonts';
import ClientContext from '@/components/Context/ClientContext';
import { getUserServerSession } from '@/utils/session/getUserServerSession';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { session } = await getUserServerSession();
  return (
    <html
      lang="ko"
      className={clsx(
        pretendardFont.variable,
        notoSerifFont.variable,
        notoSansKr.variable
      )}
    >
      <body>
        <ClientContext session={session}>{children}</ClientContext>
      </body>
    </html>
  );
};

export default RootLayout;
