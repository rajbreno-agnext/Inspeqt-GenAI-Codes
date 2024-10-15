import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon, DragHandleIcon, SearchIcon } from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  MdTextFields, MdShortText, MdSubject, MdFormatListBulleted, 
  MdCheckBox, MdArrowDropDownCircle, MdLinearScale,
  MdEmail, MdPhone, MdLocationOn, MdDateRange, MdImage, MdCloudUpload,
  MdGesture, MdAttachFile
} from 'react-icons/md';
import { HiDocumentAdd, HiViewBoards } from 'react-icons/hi';
import { FaHashtag } from 'react-icons/fa';

const FormBuilderPage = () => {
  const [formElements, setFormElements] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
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
      { icon: HiDocumentAdd, label: 'Add page' },
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
        <MenuList maxHeight="400px" overflowY="auto">
          <MenuItem icon={<SearchIcon />} closeOnSelect={false}>
            <Input placeholder="Search element" size="sm" />
          </MenuItem>
          <MenuDivider />
          {menuItems.map((group, groupIndex) => (
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
              {groupIndex < menuItems.length - 1 && <MenuDivider />}
            </MenuGroup>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );

  const renderFormElement = (element) => {
    switch (element.type) {
      case 'File upload':
        return (
          <Box borderWidth="1px" borderStyle="dashed" borderRadius="md" p={4} bg="white">
            <Flex justify="center" align="center" direction="column" h="100px">
              <AddIcon mb={2} />
              <Text fontSize="sm" color="gray.500">Size limit: 10 MB</Text>
            </Flex>
            <Text fontSize="xs" color="gray.400" mt={2}>.doc, .docx, .txt, .rtf, .odt, .ppt, .pptx, .odp, .ods, .csv, .xls, .xlsx, .numbers|.json, .xml, .zip, .rar, .mp3, .wav, .aiff, .aac, .pdf</Text>
          </Box>
        );
      case 'Long answer':
        return <Textarea placeholder="Write your long text here." />;
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
