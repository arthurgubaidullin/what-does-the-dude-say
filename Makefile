
NX=node_modules/.bin/nx
NODE_MODULES = node_modules
CI ?= false
INSTALL ?= true

all: build test lint

clean:
	@if [ -d $(NODE_MODULES) ]; then \
		$(NX) reset; \
		rm -r $(NODE_MODULES); \
	fi

install:
	if [ "$(INSTALL)" = "true" ]; then \
		make do_install; \
	fi

do_install:
	if [ "$(CI)" = "true" ]; then \
		npm ci; \
	else \
		npm install; \
	fi \

build: install test lint
	$(NX) run-many -t build

test: install lint
	$(NX) run-many -t test --passWithNoTests

lint: install
	$(NX) run-many -t lint --fix

format_check:
	$(NX) format:check --all
