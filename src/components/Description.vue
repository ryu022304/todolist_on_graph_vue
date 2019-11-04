<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.description variant="light">How to use</b-button>
      </b-card-header>
      <b-collapse id="description" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
              <pre>{{text}}</pre>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text:
`How to use: 本サイトの使い方の説明。ヘッダー部分をクリックすると非表示に出来ます。
TODO List: 
  TODO: テキストを入力して、SubmitをクリックするとGraph Area中央にテキストが表示されます。
  Axis: テキストを入力して、設定したい軸名方向のボタンをクリックするとテキストが追加されます。
  Card: 
    チェックマーク: クリックするとGraph Area上からテキストが削除されます。
    編集マーク: クリックすると編集モードになり、テキストを編集でき、もう一度マークをクリックすると編集を完了します。
Graph Area: 
  ダウンロードマーク: クリックすると現在表示中のグラフ画像のプレビューが表示されます。
    OK: 表示されているプレビュー画像をダウンロードします。
    Retry: プレビュー画像を再読み込みします。
    Cancel: プレビュー画面を終了します。
  ゴミ箱ボタン: クリックすると現在の内容を全てリセットします。
  グラフ: 
    軸、軸名、TODOカードのテキストが表示されています。TODOのみドラッグ&ドロップで動かすことができます。
※Local Storageを使用しています。もしブラウザの動作が重いと感じたらLocal Storageのリフレッシュを実行するかゴミ箱ボタンを押してください。
`
      }
    }
  }
</script>