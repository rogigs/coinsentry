import '../../index.css';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // TODO: Log error to service
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container-error">
          <h1>Servidor Indisponível</h1>
          <p>
            O servidor encontrou um erro e está indisponível no momento. Tente
            novamente mais tarde.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
