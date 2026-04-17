import re
import os

docs_dir = r"c:\Users\azizj\OneDrive\Web Development\clc\docs"
assets = ["HERMES_LOGO.jpg", "capability_lifecycle_process.png", "safe_ops_bars.png", "DSD_Alternate_Visualization.pptx"]

# Read existing styles.css and main.js and append to them
with open(os.path.join(docs_dir, "styles.css"), "a", encoding="utf-8") as fs:
    with open(os.path.join(docs_dir, "main.js"), "a", encoding="utf-8") as fjs:
        file_path = os.path.join(docs_dir, "capability_lifecycle_process.html")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Extract styles
        styles = []
        def style_repl(m):
            styles.append(m.group(1))
            return '<link rel="stylesheet" href="styles.css">'
        
        content, num_subs_style = re.subn(r'<style>(.*?)</style>', style_repl, content, flags=re.DOTALL)
        if styles:
            fs.write("\n/* styles from capability_lifecycle_process.html */\n")
            fs.write("\n".join(styles))
        
        # Extract scripts
        scripts = []
        def script_repl(m):
            scripts.append(m.group(1))
            return ''
        
        content, num_subs_script = re.subn(r'<script>(.*?)</script>', script_repl, content, flags=re.DOTALL)
        if num_subs_script > 0:
            content = content.replace("</body>", "  <script src=\"main.js\"></script>\n</body>")
        
        if scripts:
            fjs.write("\n/* scripts from capability_lifecycle_process.html */\n")
            fjs.write("\n".join(scripts))
                
        # Update asset URLs
        for asset in assets:
            content = content.replace(f'src="{asset}"', f'src="assets/{asset}"')
            content = content.replace(f'href="{asset}"', f'href="assets/{asset}"')
            
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

print("Refactoring capability_lifecycle_process.html complete.")
