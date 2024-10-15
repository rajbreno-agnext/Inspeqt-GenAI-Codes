import React, { useState, useCallback } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Flex,
  Input,
  Textarea,
  Collapse,
  Portal,
  MenuGroup,
  MenuDivider,
  Button,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon, DragHandleIcon, SearchIcon } from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  MdTextFields, MdShortText, MdSubject, 
  MdCheckBox, MdArrowDropDownCircle, MdLinearScale,
  MdEmail, MdPhone, MdDateRange, MdImage, MdCloudUpload,
} from 'react-icons/md';
import { HiViewBoards } from 'react-icons/hi';
import { FaHashtag } from 'react-icons/fa';

const FormBuilderPage = () => {
  const [formSections, setFormSections] = useState([{ id: 'section-1', isOpen: true, elements: [] }]);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const addElement = (elementType, sectionIndex, elementIndex) => {
    const newSections = [...formSections];
    if (elementType === 'Add Section') {
      const newSection = { id: `section-${Date.now()}`, isOpen: true, elements: [] };
      newSections.splice(sectionIndex + 1, 0, newSection);
    } else {
      const newElement = { type: elementType, id: Date.now().toString() };
      newSections[sectionIndex].elements.splice(elementIndex + 1, 0, newElement);
      newSections[sectionIndex].isOpen = true; // Automatically open the section
    }
    setFormSections(newSections);
    onMenuClose();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newSections = [...formSections];

    if (source.droppableId === destination.droppableId) {
      const sectionIndex = formSections.findIndex(section => section.id === source.droppableId);
      const [reorderedItem] = newSections[sectionIndex].elements.splice(source.index, 1);
      newSections[sectionIndex].elements.splice(destination.index, 0, reorderedItem);
    } else {
      const sourceSectionIndex = formSections.findIndex(section => section.id === source.droppableId);
      const destSectionIndex = formSections.findIndex(section => section.id === destination.droppableId);
      const [movedItem] = newSections[sourceSectionIndex].elements.splice(source.index, 1);
      newSections[destSectionIndex].elements.splice(destination.index, 0, movedItem);
    }

    setFormSections(newSections);
  };

  const menuItems = [
    { group: 'Blocks', items: [
      { icon: HiViewBoards, label: 'Add Section' },
    ]},
    { group: 'Text', items: [
      { icon: MdShortText, label: 'Short answer' },
      { icon: MdSubject, label: 'Long answer' },
    ]},
    { group: 'Choices', items: [
      { icon: MdCheckBox, label: 'Single select' },
      { icon: MdCheckBox, label: 'Multi select' },
      { icon: MdCheckBox, label: 'Checkbox' },
      { icon: MdArrowDropDownCircle, label: 'Dropdown' },
      { icon: MdLinearScale, label: 'Slider' },
    ]},
    { group: 'Number', items: [
      { icon: FaHashtag, label: 'Number' },
    ]},
    { group: 'Contact info', items: [
      { icon: MdEmail, label: 'Email input' },
      { icon: MdPhone, label: 'Phone number' },
      { icon: MdDateRange, label: 'Date / time picker' },
    ]},
    { group: 'Uploads', items: [
      { icon: MdImage, label: 'Media' },
      { icon: MdCloudUpload, label: 'File uploader' },
    ]},
  ];

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredMenuItems = menuItems.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const renderMenuItems = (items, sectionIndex, elementIndex) => (
    <Menu key={elementIndex}>
      <MenuButton
        as={IconButton}
        icon={<AddIcon />}
        aria-label="Add element"
        variant="ghost"
        size="sm"
      />
      <Portal>
        <MenuList maxHeight="400px" overflowY="auto" css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.300',
            borderRadius: '24px',
          },
        }}>
          <Box px={4} py={2}>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search element"
                value={searchQuery}
                onChange={handleSearch}
                borderRadius="md"
              />
            </InputGroup>
          </Box>
          <MenuDivider />
          {filteredMenuItems.map((group, groupIndex) => (
            <MenuGroup key={groupIndex} title={group.group}>
              {group.items.map((item, itemIndex) => (
                <MenuItem 
                  key={itemIndex} 
                  icon={<item.icon />} 
                  onClick={() => addElement(item.label, sectionIndex, elementIndex)}
                >
                  {item.label}
                </MenuItem>
              ))}
              {groupIndex < filteredMenuItems.length - 1 && <MenuDivider />}
            </MenuGroup>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );

  const renderFormElement = (element) => {
    switch (element.type) {
      case 'Short answer':
        return <Input placeholder="Short answer" />;
      case 'Long answer':
        return <Textarea placeholder="Long answer" />;
      case 'Single select':
        return (
          <RadioGroup>
            <Stack>
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
              <Radio value="3">Option 3</Radio>
            </Stack>
          </RadioGroup>
        );
      case 'Multi select':
        return (
          <VStack align="start">
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
          </VStack>
        );
      case 'Checkbox':
        return <Checkbox>Checkbox label</Checkbox>;
      case 'Dropdown':
        return (
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        );
      case 'Slider':
        return (
          <Slider aria-label="slider-example" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        );
      case 'Number':
        return (
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      case 'Email input':
        return <Input type="email" placeholder="Enter email" />;
      case 'Phone number':
        return <Input type="tel" placeholder="Enter phone number" />;
      case 'Date / time picker':
        return <Input type="datetime-local" />;
      case 'Media':
      case 'File uploader':
        return (
          <Box borderWidth="1px" borderStyle="dashed" borderRadius="md" p={4} bg="white">
            <Flex justify="center" align="center" direction="column" h="100px">
              <AddIcon mb={2} />
              <Text fontSize="sm" color="gray.500">Click to upload or drag and drop</Text>
            </Flex>
          </Box>
        );
      default:
        return <Input placeholder={`${element.type} placeholder`} />;
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <DragDropContext onDragEnd={onDragEnd}>
        {formSections.map((section, sectionIndex) => (
          <Box 
            key={section.id}
            bg="white" 
            borderRadius="md" 
            boxShadow="sm" 
            mb={4} 
            overflow="visible"
            position="relative"
          >
            <Flex 
              justify="space-between" 
              align="center" 
              p={4} 
              borderBottomWidth={section.isOpen ? "1px" : "0"}
              borderBottomColor="gray.200"
              position="relative"
              _hover={{
                "& > .section-actions": {
                  opacity: 1,
                }
              }}
            >
              <Flex align="center" onClick={() => {
                const newSections = [...formSections];
                newSections[sectionIndex].isOpen = !newSections[sectionIndex].isOpen;
                setFormSections(newSections);
              }} cursor="pointer" flex={1}>
                <Heading size="md">Section {sectionIndex + 1}</Heading>
                <IconButton
                  icon={section.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  variant="ghost"
                  aria-label={section.isOpen ? "Collapse section" : "Expand section"}
                  ml={2}
                />
              </Flex>
              <Flex 
                className="section-actions"
                opacity={0}
                transition="opacity 0.2s"
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
              >
                {renderMenuItems(menuItems, sectionIndex, -1)}
              </Flex>
            </Flex>
            <Collapse in={section.isOpen}>
              <Box p={4}>
                <Droppable droppableId={section.id}>
                  {(provided) => (
                    <VStack
                      spacing={4}
                      align="stretch"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {section.elements.map((element, elementIndex) => (
                        <Draggable key={element.id} draggableId={element.id} index={elementIndex}>
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              bg="white"
                              p={4}
                              borderRadius="md"
                              boxShadow="sm"
                              borderWidth="1px"
                              borderColor="gray.200"
                              position="relative"
                              _hover={{
                                "& > .element-actions": {
                                  opacity: 1,
                                }
                              }}
                            >
                              <Flex justify="space-between" align="center" mb={2}>
                                <Flex align="center">
                                  <Text fontWeight="bold">{element.type}</Text>
                                </Flex>
                              </Flex>
                              {renderFormElement(element)}
                              <Flex 
                                className="element-actions"
                                position="absolute"
                                top={2}
                                right={2}
                                opacity={0}
                                transition="opacity 0.2s"
                              >
                                <IconButton
                                  {...provided.dragHandleProps}
                                  icon={<DragHandleIcon />}
                                  aria-label="Drag"
                                  variant="ghost"
                                  size="sm"
                                  mr={1}
                                />
                                {renderMenuItems(menuItems, sectionIndex, elementIndex)}
                              </Flex>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </VStack>
                  )}
                </Droppable>
              </Box>
            </Collapse>
          </Box>
        ))}
      </DragDropContext>
    </Box>
  );
};

export default FormBuilderPage;