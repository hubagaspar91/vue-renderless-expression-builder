<template>
    <expression-node-group-renderless :node="node" v-slot="{
     node,  // the current node (node group in this case)
     index,  // the index of this node amongst its parent's children, if it is the root, returns -1
     deleteSelf,  // deletes the current node group with all its children
     toggleConnectionType,  // toggles between 'and' and 'or', or 'all', and 'any'
     insert,  // inserts a new node, at a given index
     addNode,  // pushes a node to the end of the children list of this node group
     addGroup,  // pushes a node group to the end of the children list of this node group
     conditionFactory  // it stores the defined fields, fieldTypes and operators, and creates new conditions with its create method
   }">
        <section class="expression-node-group">
            <header>
                <!-- The connection type property of the node group determines,
                whether all or any of their children have to eval to true, in order for the group to eval to true -->
                <div class="toggle-ct" @click="toggleConnectionType">
                    <span :class="{selected: node.connectionType === 'and'}">AND</span>
                    <span :class="{selected: node.connectionType === 'or'}">OR</span>
                </div>

                <div class="controls">
                    <!-- Adds a new node group as the last child of the current node group -->
                    <b-button @click="addGroup()">add group</b-button>
                    <!-- Adds a new node as the last child of the current node group -->
                    <b-button @click="addNode()">add node</b-button>
                    <!-- Deletes the current node group -->
                    <b-icon-x v-if="node.parentNode" @click="deleteSelf"></b-icon-x>
                </div>
            </header>
            <main>
                <ul>
                    <li v-for="child in node.children">
                        <!-- The ExpressionNodeGroup component has to be recursive by nature -->
                        <expression-node-group v-if="child.children" :node="child"></expression-node-group>
                        <expression-node v-else :node="child"></expression-node>
                    </li>
                </ul>
            </main>
        </section>
    </expression-node-group-renderless>
</template>

<script>
  import {Core, Components} from "vue-renderless-expression-builder";
  import ExpressionNode from "./ExpressionNode";
  const {ExpressionNodeGroupRenderless} = Components;

  export default {
    name: "ExpressionNodeGroup",
    props: {
      node: {
        type: Core.ExpressionNodeGroup,
        required: true
      }
    },
    components: {
      // renderless group component
      ExpressionNodeGroupRenderless,

      // your node implementation
      ExpressionNode
    }
  }
</script>

<style scoped lang="scss">
    .expression-node-group {
        box-sizing: border-box;
        border: 1px solid darkgray;
        border-radius: 3px;
        border-left: 2px solid darkseagreen;
        margin: 1rem 0;

        header {
            display: flex;
            justify-content: space-between;
            position: relative;
            align-items: center;
            margin-bottom: 1rem;
            background: whitesmoke;
            padding: 1rem;
            border-bottom: 1px solid darkgray;

            .toggle-ct {
                span {
                    background: lightgray;
                }

                span.selected {
                    background: darkseagreen;
                }

                span:first-child {
                    padding: 0.3rem 0.15rem 0.3rem 0.3rem;
                    border-radius: 3px 0 0 3px;
                }
                span:last-child {
                    padding: 0.3rem 0.3rem 0.3rem 0.15rem;
                    border-radius: 0 3px 3px 0;
                }
            }

            .controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                button {
                    margin-right: 1rem;
                }
            }


            svg {
                height: 1.5rem;
                width: 1.5rem;
                cursor: pointer;
            }
        }

        main {
            padding: 1rem;
        }
    }
    ul {
        list-style: none;
        margin: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 0;
    }
</style>