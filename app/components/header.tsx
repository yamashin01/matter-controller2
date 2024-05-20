import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="space-x-4">
        <Link
          href="/"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          トップページ
        </Link>
        <Link
          href="/matter"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          未完了の案件
        </Link>
        <Link
          href="/completed-matter"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          完了した案件
        </Link>
        <Link
          href="/login"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          ログアウト
        </Link>
      </nav>
    </header>
  );
}
