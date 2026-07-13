// Deklarasi tipe untuk side-effect import file CSS.
// Mengatasi ts2882 "Cannot find module for side-effect import"
// ketika TS Server tidak mengenali import "./globals.css".
declare module "*.css";