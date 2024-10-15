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
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon, DragHandleIcon, SearchIcon } from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  MdTextFields, MdShortText, MdSubject, MdFormatListBulleted, 
  MdCheckBox, MdArrowDropDownCircle, MdLinearScale,
  MdEmail, MdPhone, MdLocationOn, MdDateRange, MdImage, MdCloudUpload,
  MdGesture, MdAttachFile
} from 'react-icons/md';
import { HiViewBoards } from 'react-icons/hi';
import { FaHashtag } from 'react-icons/fa';

const FormBuilderPage = () => {
  const [formElements, setFormElements] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const addElement = (elementType, index) => {
    const newElements = [...formElements];
    newElements.splice(index + 1, 0, { type: elementType, id: Date.now().toString() });
    setFormElements(newElements);
    onMenuClose();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormElements(items);
  };

  const menuItems = [
    { group: 'Blocks', items: [
      { icon: HiViewBoards, label: 'Add Section' },
    ]},
    { group: 'Text', items: [
      { icon: MdTextFields, label: 'Heading' },
      { icon: MdSubject, label: 'Paragraph' },
      { icon: MdShortText, label: 'Short answer' },
      { icon: MdSubject, label: 'Long answer' },
      { icon: MdFormatListBulleted, label: 'Multiple text fields' },
      { icon: MdFormatListBulleted, label: 'Configurable list' },
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
      { icon: MdLocationOn, label: 'Address' },
      { icon: MdDateRange, label: 'Date / time picker' },
    ]},
    { group: 'Uploads', items: [
      { icon: MdImage, label: 'Media' },
      { icon: MdCloudUpload, label: 'File uploader' },
    ]},
    { group: 'Miscellaneous', items: [
      { icon: MdLocationOn, label: 'Location' },
      { icon: MdGesture, label: 'Signature' },
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

  const renderMenuItems = (items, index) => (
    <Menu key={index}>
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
                  onClick={() => addElement(item.label, index)}
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
      case 'Heading':
        return <Heading size="md">Sample Heading</Heading>;
      case 'Paragraph':
        return <Text>This is a sample paragraph. Replace with your content.</Text>;
      case 'Short answer':
        return <Input placeholder="Short answer" />;
      case 'Long answer':
        return <Textarea placeholder="Write your long text here." />;
      case 'Multiple text fields':
        return (
          <VStack align="stretch">
            <Input placeholder="Field 1" />
            <Input placeholder="Field 2" />
            <Input placeholder="Field 3" />
          </VStack>
        );
      case 'Configurable list':
        return (
          <VStack align="stretch">
            <Input placeholder="List item 1" />
            <Input placeholder="List item 2" />
            <Button size="sm">Add item</Button>
          </VStack>
        );
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
          <VStack align="stretch">
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
        return <Input type="range" />;
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
      case 'Address':
        return (
          <VStack align="stretch">
            <Input placeholder="Street address" />
            <Input placeholder="City" />
            <Input placeholder="State/Province" />
            <Input placeholder="ZIP/Postal code" />
          </VStack>
        );
      case 'Date / time picker':
        return <Input type="datetime-local" />;
      case 'Media':
        return <Input type="file" accept="image/*,video/*" />;
      case 'File uploader':
        return (
          <Box borderWidth="1px" borderStyle="dashed" borderRadius="md" p={4} bg="white">
            <Flex justify="center" align="center" direction="column" h="100px">
              <AddIcon mb={2} />
              <Text fontSize="sm" color="gray.500">Click to upload or drag and drop</Text>
            </Flex>
          </Box>
        );
      case 'Location':
        return <Input placeholder="Enter location" />;
      case 'Signature':
        return (
          <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
            <Text fontSize="sm" color="gray.500">Signature pad placeholder</Text>
          </Box>
        );
      default:
        return <Input placeholder={`${element.type} placeholder`} />;
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <Box 
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
          borderBottomWidth={isOpen ? "1px" : "0"}
          borderBottomColor="gray.200"
          position="relative"
          _hover={{
            "& > .section-actions": {
              opacity: 1,
            }
          }}
        >
          <Flex align="center" onClick={() => setIsOpen(!isOpen)} cursor="pointer" flex={1}>
            <Heading size="md">Section</Heading>
            <IconButton
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              variant="ghost"
              aria-label={isOpen ? "Collapse section" : "Expand section"}
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
            {renderMenuItems(menuItems, -1)}
          </Flex>
        </Flex>
        <Collapse in={isOpen}>
          <Box p={4}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="form-elements">
                {(provided) => (
                  <VStack
                    spacing={4}
                    align="stretch"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {formElements.map((element, index) => (
                      <Draggable key={element.id} draggableId={element.id} index={index}>
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
                              {renderMenuItems(menuItems, index)}
                            </Flex>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default FormBuilderPage;