import { useState } from 'react';
import styles from './App-calc.module.css';
import { evaluate } from 'mathjs';

export const AppCalc = () => {
    const [expr, setExpr] = useState("");
    const [error, setError] = useState("");
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const input = (val) => {
        setError("");
        setExpr(prev => prev + val);
    };

    const calculate = () => {
        try {
            const result = evaluate(expr);
            setHistory(prev => [...prev, `${expr} = ${result}`]);
            setExpr(String(result));
            setError("");
        } catch {
            setError("error-glitch");
            setTimeout(() => setError(""), 600);
        }
    };

    const reset = () => {
        setExpr("");
        setError("");
    };

    const clearHistory = () => setHistory([]);

    return (
        <div className={styles.appCalc}>

            <div className={`${styles.display} ${error === 'error-glitch' ? styles.glitch : ""}`}>
                {error && error !== "error-glitch" ? error : expr || "0"}
            </div>

            <div className={styles.buttons}>
                {"1234567890".split("").map(n => (
                    <button key={n} onClick={() => input(n)}>{n}</button>
                ))}

                <button onClick={() => input(".")}>.</button>

                <button onClick={() => input("+")}>+</button>
                <button onClick={() => input("-")}>-</button>
                <button onClick={() => input("*")}>*</button>
                <button onClick={() => input("/")}>/</button>

                <button onClick={() => input("(")}>(</button>
                <button onClick={() => input(")")}>)</button>

                <button onClick={() => input("^")}>xʸ</button>
                <button onClick={() => input("sqrt(")}>√</button>

                <button onClick={calculate}>=</button>
                <button onClick={reset}>C</button>
                <button onClick={() => setShowHistory(true)}>History</button>
            </div>

            {showHistory && (
                <div className={styles.historyPanel}>
                    <h2>История вычислений</h2>

                    <div className={styles.historyList}>
                        {history.length === 0 && <p>История пуста</p>}
                        {history.map((h, i) => (
                            <div key={i} className={styles.historyItem}>{h}</div>
                        ))}
                    </div>

                    <div className={styles.historyButtons}>
                        <button onClick={clearHistory}>Очистить</button>
                        <button onClick={() => setShowHistory(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};
