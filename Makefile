CSS_DIR = ./css
LESS_DIR = ./less
JS_DIR = ./js/src
JS_COMPONENTS_DIR = ${JS_DIR}/components

MAIN_LESS = ${LESS_DIR}/backbone.gui.less
MAIN_CSS = ${CSS_DIR}/lib/backbone.gui.css
MAIN_JS = ${JS_DIR}/backbone.gui.js
COMPILED_JS = ${JS_DIR}/../lib/backbone.gui.js

build:
	@echo "Building backbone.gui..."

	@echo "Compiling JS..."
	@cat ${MAIN_JS} ${JS_COMPONENTS_DIR}/* > ${COMPILED_JS}

	@echo "Compiling LESS..."
	@rm -f ${MAIN_CSS}
	@mkdir -p ${CSS_DIR}
	@mkdir -p ${CSS_DIR}/lib
	@touch ${MAIN_CSS}
	@recess --compile ${MAIN_LESS} > ${MAIN_CSS}

watch:
	@echo "Watching LESS and JS changes..."
	@watchr -e "watch('(less/.*\.less)|(js/src/.*\.js)') { system 'make build' }"