from pathlib import Path
import yaml
from jinja2 import Environment, FileSystemLoader

# Set up paths and Jinja2 environment
base_dir = Path('.')
dist_dir = base_dir / 'dist'
dist_dir.mkdir(exist_ok=True)

env = Environment(loader=FileSystemLoader(str(base_dir)))

# Process all .yaml files in current directory
for yaml_file in base_dir.glob('*.yaml'):
    name = yaml_file.stem
    template_file = base_dir / f"{name}.html"
    output_file = dist_dir / f"{name}.html"

    if not template_file.exists():
        print(f"Template {template_file} not found. Skipping.")
        continue

    # Load YAML data
    with yaml_file.open('r') as f:
        data = yaml.safe_load(f)

    # Load and render template
    template = env.get_template(template_file.name)
    rendered = template.render(data)

    # Write rendered HTML
    with output_file.open('w') as f:
        f.write(rendered)

    print(f"Rendered {output_file}")
