import "./App.css"
import LanguageSwitcher from "./components/LanguageSwitcher"
import ProductList from "./components/ProductList"
import { useTranslation } from "react-i18next"

export const App = () => {
  const t = useTranslation()

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t(`page.${name}`)}</h1>
        <LanguageSwitcher />
        <ProductList />
      </header>
    </div>
  )
}
