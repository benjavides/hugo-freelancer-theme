import re
from collections import Counter

def extract_colors(css_content):
    # Regular expression to match hex, rgb, rgba, and hsl colors
    color_regex = r'(#(?:[0-9a-fA-F]{3}){1,2}|rgb(?:a)?\([^)]+\)|hsl(?:a)?\([^)]+\))'
    colors = re.findall(color_regex, css_content)
    return colors

def define_color_variables(colors):
    color_counter = Counter(colors)
    # Only define variables for colors used more than once
    color_variables = {
        color: f'--color-{i}' for i, (color, count) in enumerate(color_counter.items(), 1) if count > 1
    }
    return color_variables

def replace_colors_with_variables(css_content, color_variables):
    # Replace colors with their corresponding variables
    for color, var in color_variables.items():
        css_content = re.sub(re.escape(color), f'var({var})', css_content)
    return css_content

def add_variables_to_top(css_content, color_variables):
    # Add the variables at the top of the CSS content
    variables = [f'{var}: {color};' for color, var in color_variables.items()]
    variables_block = ":root {\n    " + "\n    ".join(variables) + "\n}\n\n"
    return variables_block + css_content

def process_css_file(input_file, output_file):
    with open(input_file, 'r') as file:
        css_content = file.read()

    # Extract colors
    colors = extract_colors(css_content)
    
    # Define color variables
    color_variables = define_color_variables(colors)
    
    # Replace colors with variables
    css_content = replace_colors_with_variables(css_content, color_variables)
    
    # Add variables to the top of the file
    css_content = add_variables_to_top(css_content, color_variables)
    
    # Write the modified CSS to the output file
    with open(output_file, 'w') as file:
        file.write(css_content)
    
    print(f"Processed CSS saved to {output_file}")

# Example usage
input_css = 'bootstrap.min.css'  # Path to the input CSS file
output_css = 'bootstrap_variables.min.css'  # Path to the output CSS file
process_css_file(input_css, output_css)
