import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidUpdate(prev: { resetKey?: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="empty" role="alert">
        <h4>This section hit an error</h4>
        <p className="small">Your data is safe — it’s stored separately. Try another section, reload the page, or download a backup from Help → Backup.</p>
        <pre className="small" style={{ textAlign: 'left', maxWidth: 640, margin: '12px auto 0' }}>{this.state.error.message}</pre>
      </div>
    );
  }
}
