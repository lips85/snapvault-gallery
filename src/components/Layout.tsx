import { MobileMenu } from './MobileMenu';
import { MainNav } from './MainNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* 네비게이션 바 */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
          {/* 모바일에서는 햄버거 메뉴로 변환 */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex md:flex-1">
            <MainNav />
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 그리드 레이아웃 - 모바일에서는 1열, 태블릿부터 2열, 데스크톱에서 3열 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </main>
    </div>
  );
} 