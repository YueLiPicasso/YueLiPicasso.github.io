CATALA_HOME=/home/yuelipicasso/Documents/myforks/offcial_Catala/catala-0.7.0

ifeq ($(CATALA_HOME),)
  $(error "Please build Catala from source, then export CATALA_HOME to point to the source directory")
endif

COMPILER_DIR=$(CATALA_HOME)/_build/default/compiler
CATALA=$(COMPILER_DIR)/catala.exe
PLUGIN_DIR=$(COMPILER_DIR)/plugins

ifeq (,$(wildcard $(CATALA)))
  $(error "Incorrect Catala directory, $(CATALA) does not exist")
endif

SOURCES=Florida_DUI_2022.catala_en
JS_BUILD=ocaml/_build/default/florida_api_web.bc.js

all: test florida.js

# Testing
# -------

.PHONY: test

# We rely on the Catala interpreter to run our Catala test
test:
	$(CATALA) Interpret --scope=Test test.catala_en

# JS build
# --------

# Step 1: extract Catala code to OCaml code, relying on the api_web plugin to
# auto-generate OCaml-written js_of_ocaml bindings (sadly, this requires a
# source build of Catala as the plugin is currently not distributed via `opam
# install`). The auto-generated bindings are in Florida_api_web.ml, a dependency
# which we do not track here.
ocaml/Florida.ml: $(SOURCES)
	$(CATALA) api_web --plugin-dir=$(PLUGIN_DIR) $^ -o $@

.PHONY: $(JS_BUILD)

# Step 2: compile Florida.ml and Florida_api_web.ml into an OCaml bytecode
# library; compile this bytecode to JS via js_of_ocaml; rely on the
# auto-generated js_of_ocaml bindings to expose a palatable JavaScript API. This
# build is handled via dune (OCaml's build system tool) and is described in
# ocaml/dune.
$(JS_BUILD): ocaml/Florida.ml
	cd ocaml && dune build

# Step 3: fetch the generate JS file and bring it back into this directory.
florida.js: $(JS_BUILD)
	rm -rf $@ && cp $< $@
