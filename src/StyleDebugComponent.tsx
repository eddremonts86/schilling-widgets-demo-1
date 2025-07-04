import React from "react";

const StyleDebugComponent: React.FC = () => {
    React.useEffect(() => {
        // Check CSS Variables
        const root = getComputedStyle(document.documentElement);
        const primary = root.getPropertyValue("--primary").trim();
        const background = root.getPropertyValue("--background").trim();

        console.log("🎨 CSS Variables Check:");
        console.log("  --primary:", primary || "❌ Not found");
        console.log("  --background:", background || "❌ Not found");

        // Check if Schilling CSS classes exist
        const testDiv = document.createElement("div");
        testDiv.className = "schilling-button schilling-button--primary";
        document.body.appendChild(testDiv);

        const styles = getComputedStyle(testDiv);
        const hasButtonStyles = styles.display === "inline-flex";

        console.log("🔧 Schilling Button Classes:");
        console.log("  .schilling-button display:", styles.display);
        console.log("  Classes working:", hasButtonStyles ? "✅ Yes" : "❌ No");

        document.body.removeChild(testDiv);

        // Check CSS file loading
        const cssLinks = Array.from(
            document.querySelectorAll('link[rel="stylesheet"]')
        );
        const schillingCSS = cssLinks.find((link) =>
            (link as HTMLLinkElement).href.includes("schilling-widgets")
        );

        console.log("📁 CSS Files:");
        console.log(
            "  Schilling CSS loaded:",
            schillingCSS ? "✅ Yes" : "❌ No"
        );
        console.log("  Total CSS files:", cssLinks.length);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 10,
                right: 10,
                background: "rgba(0,0,0,0.8)",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "12px",
                zIndex: 9999,
                maxWidth: "250px",
            }}
        >
            <div>🔍 Style Debug Active</div>
            <div style={{ fontSize: "10px", marginTop: "5px" }}>
                Check console for details
            </div>
        </div>
    );
};

export default StyleDebugComponent;
