/// <reference types="next" />
/// <reference types="next/types/global" />

/**
 * これは、/// <reference types="hoge" />のディレクティブを使っているので、nextとnext/types/globalの宣言をコードの中で使用することを宣言しています。
 * これらのファイルの場所を確認してみると、node_modules/next/types/index.d.tsとnode_modules/next/types/global.d.tsにあります。
 *これらのファイルで宣言されていることによって、Reactがグローバルで使えるようになっていたり、css modulesが使えるようになっていたりしています。
 */
