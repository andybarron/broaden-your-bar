import React from "react"
import { BarApp } from "./BarApp"
import { RecipeEditor } from "./RecipeEditor/RecipeEditor"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/devtools">
          <RecipeEditor />
        </Route>
        <Route path="/">
          <BarApp />
        </Route>
      </Switch>
    </Router>
  )
}
