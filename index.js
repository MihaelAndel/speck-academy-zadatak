let keyCounter = 0;
let selectedTools = [];
let availableTools = [];

//Element that contains all selected tools
const toolbox = document.querySelector('#toolbox');

//Element that contains all available tools
const tools = document.querySelector('#tools');

const resetKeyCounter = () => {
	keyCounter = 0;
};

const removeSelectedTool = selectedTool => {
	//Creates a copy of the old array, missing only the deselected tool
	selectedTools = selectedTools.filter(tool => {
		return tool.key !== selectedTool.key;
	});

	//Resets the key counter if there are no selected tools
	//just so the key counter doesn't increment to infinity
	if (selectedTools.length === 0) resetKeyCounter();

	renderSelectedTools();
};

const addOnDeselectListener = element => {
	element.addEventListener('click', event => {
		const tool = { key: event.target.key, name: event.target.innerHTML };
		removeSelectedTool(tool);
	});
};

const createListElement = tool => {
	const listElement = document.createElement('li');
	listElement.innerHTML = tool.name;
	listElement.key = tool.key;
	listElement.classList = 'selected-tool list-element';

	addOnDeselectListener(listElement);

	return listElement;
};

const renderSingleTool = tool => {
	toolbox.appendChild(tool);
};

const clearRenderedTools = () => {
	while (toolbox.firstChild) {
		toolbox.removeChild(toolbox.firstChild);
	}
};

const renderSelectedTools = () => {
	clearRenderedTools();
	selectedTools.forEach(tool => {
		renderSingleTool(createListElement(tool));
	});
};

const addSelectedTool = tool => {
	//Incrementing the key counter, so each subsequent tool gets a unique key
	const selectedTool = { key: keyCounter++, name: tool };

	//Adding the selected tool to the start of the list
	selectedTools = [selectedTool, ...selectedTools];
};

const setOnSelectListeners = elements => {
	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', event => {
			const tool = event.target.innerHTML;
			addSelectedTool(tool);
			renderSelectedTools();
		});
	}
};

const getAvailableTools = tools => {
	const availableTools = [];
	for (let i = 0; i < tools.length; i++) {
		availableTools.push(tools[i].innerHTML);
	}
	return availableTools;
};

const initialize = () => {
	const allToolElements = tools.children;
	availableTools = getAvailableTools(allToolElements);
	setOnSelectListeners(allToolElements);
};

initialize();
