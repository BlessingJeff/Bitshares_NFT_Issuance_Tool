import { useState } from 'react';
import { Textarea, Button, Group, Box, Text, Divider, Col, Paper } from '@mantine/core';

function openURL(target) {
  window.electron.openURL(target);
}

export default function Offchain(properties) {
  const images = properties.images;
  const setImages = properties.setImages;
  const setMode = properties.setMode;

  const changingImages = properties.changingImages;
  const setChangingImages = properties.setChangingImages;

  let allowedFileTypes = [".png", ".PNG", ".gif", ".GIF", ".jpg", ".JPG", ".jpeg", ".JPEG"];

  function getFileType(ipfsURL) {
    let fileType;
    let valueSlice = ipfsURL.substr(ipfsURL.length - 5);
    if (valueSlice.includes('.png') || valueSlice.includes('.PNG')) {
      fileType = 'png';
    } else if (valueSlice.includes('.gif') || valueSlice.includes('.GIF')) {
      fileType = 'gif';
    } else if (valueSlice.includes('.jpeg') || valueSlice.includes('.JPEG')) {
      fileType = 'jpeg';
    } else {
      console.log('Unsupported filetype');
      return;
    }
    return fileType;
  }

  const [value, setValue] = useState('');
  const [listItems, setListItems] = useState(
          changingImages && images && images.length
            ? images
            : []
        );
  const [chosenFileType, setChosenFileType] = useState(changingImages && images && images.length ? images[0].type : null);

  function addListItem() {
    let currentListItems = listItems;
    let existingListItem = listItems.filter(listItem => listItem.url === value);
    if (!existingListItem.length) {
      let fileType = getFileType(value);

      if (chosenFileType && fileType !== chosenFileType) {
        console.log('All files must have the same file format.');
        return;
      }

      setChosenFileType(fileType);
      currentListItems.push({url: value, type: fileType});
      setListItems(currentListItems);
    }
    setValue('');
  }

  function removeListItem(item) {
    if (listItems && listItems.length === 1) {
      setListItems([]);
      setChosenFileType();
      return;
    }

    let currentListItems = listItems;
    let newListItems = currentListItems.filter(listItem => listItem.url != item);
    setListItems(newListItems);

    if (!listItems.length) {
      setChosenFileType();
    }
  }

  function proceed() {
    setChangingImages(false);
    setImages(listItems);
  }

  function back() {
    if (changingImages) {
      setChangingImages(false);
    } else {
      setMode();
    }
  }

  let proceedButton = listItems && listItems.length
      ? <Button
          sx={{margin: '5px'}}
          onClick={() => {
            proceed()
          }}
        >
          Proceed with issuance
        </Button>
      : <Button
          sx={{margin: '5px'}}
          disabled
        >
          Proceed with issuance
        </Button>

  let ipfsButton = value
  ? <Button
      onClick={() => {
        let four = value.substr(value.length - 4);
        let five = value.substr(value.length - 5);
        if (allowedFileTypes.includes(four) || allowedFileTypes.includes(five)) {
          addListItem()
        }
      }}
    >
      Add IPFS url
    </Button>
  : <Button disabled>
      Add IPFS url
    </Button>;

  return (
    <span>
      <Col span={12}>
        <Paper padding="sm" shadow="xs">
          <Box mx="auto" sx={{padding: '10px'}}>
            <Text size="sm">
              This tool enables creation of NFTs which use IPFS as their media storage.
            </Text>
            <Text size="sm">
              At the moment only PNG, JPEG and GIF files are supported, however multiple images can be stored in the one NFT.
            </Text>
            <Textarea
              label="Full IPFS URL for an individual file:"
              placeholder="/ipfs/CID/fileName.png"
              value={value}
              autosize
              minRows={1}
              maxRows={1}
              onChange={(event) => setValue(event.currentTarget.value)}
              sx={{marginTop: '10px', marginBottom: '10px'}}
            />
            {ipfsButton}
            <Button
              sx={{marginTop: '5px', marginLeft: '5px'}}
              onClick={() => {
                setMode()
              }}
            >
              Back
            </Button>
          </Box>
        </Paper>
      </Col>
      {
        listItems && listItems.length
        ? <Col span={12}>
            <Paper padding="sm" shadow="xs">
              <Box mx="auto" sx={{padding: '10px'}}>
                <Text size="sm" weight={600}>
                  IPFS URLs
                </Text>
                {listItems.map(item => {
                  return <Group key={item.url} sx={{margin: '5px'}}>
                            <Button
                              compact
                              variant="outline"
                              onClick={() => {
                                removeListItem(item.url)
                              }}
                            >
                              ❌
                            </Button>
                            <Text size="sm">
                              { item.url } ({item.type})
                            </Text>
                          </Group>;
                })}
                {
                  proceedButton
                }
              </Box>
            </Paper>
          </Col>
        : <Col span={12}>
            <Paper padding="sm" shadow="xs">
              <Box mx="auto" sx={{padding: '10px'}}>
                <Text size="sm">
                  Not yet uploaded your NFT images to IPFS?
                </Text>
                <Text size="sm">
                  Then check out the following IPFS pinning services:
                </Text>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_pinata')
                  }}
                >
                  Pinata
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_nft_storage')
                  }}
                >
                  NFT.Storage
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_web3_storage')
                  }}
                >
                  Web3.Storage
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_fleek')
                  }}
                >
                  Fleek
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_infura')
                  }}
                >
                  Infura
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_storj')
                  }}
                >
                  Storj DCS
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_eternum')
                  }}
                >
                  Eternum
                </Button>
                <Button
                  compact
                  sx={{margin: '2px'}}
                  onClick={() => {
                    openURL('ipfs_docs')
                  }}
                >
                  IPFS NFT Docs
                </Button>
              </Box>
            </Paper>
          </Col>
      }
    </span>
  );
}
